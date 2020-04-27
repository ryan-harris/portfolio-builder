$(() => {
  const signUpForm = $("form.signup");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");
  const confirmInput = $("input#confirm-input");
  const githubInput = $("input#github-input");
  const urlLabel = $("#urlLabel");

  usernameInput.on("keyup", event => {
    urlLabel.text(event.target.value);
  });

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    toggleSpinnerAndForm();

    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      github: githubInput.val().trim()
    };

    if (!userData.username || !userData.password || !userData.github) {
      handleLoginErr("Fields cannot be empty.");
      return;
    }

    if (userData.password !== confirmInput.val().trim()) {
      handleLoginErr("Passwords must match");
      return;
    }

    signUpUser(userData.username, userData.password, userData.github);
    usernameInput.val("");
    passwordInput.val("");
    githubInput.val("");
    confirmInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, password, github) {
    $.post("/api/signup", {
      username: username,
      password: password,
      github: github
    })
      .then(() => {
        window.location.replace("/dashboard");
      })
      .catch(err => {
        if (err.status === 401) {
          handleLoginErr("That username already exists");
        } else {
          handleLoginErr(err.response);
        }
      });
  }

  function handleLoginErr(message) {
    toggleSpinnerAndForm();
    $("#alert .msg").text(message);
    $("#alert").fadeIn(500);
  }

  function toggleSpinnerAndForm() {
    $("#loginForm").toggle();
    $("#spinner").toggle();
  }

  // function addSpinner() {
  //   $(".uk-container").append(
  //     "<div id ='spinner'><span class = 'uk-position-center' uk-spinner='ratio: 4.5'></span></div>"
  //   );
  //   signUpForm.css("opacity", "0");
  // }

  // function removeSpinner() {
  //   $("#spinner").remove();
  //   signUpForm.css("opacity", "100");
  // }
});
