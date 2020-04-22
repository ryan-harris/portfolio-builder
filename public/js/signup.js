$(() => {
  const signUpForm = $("form.signup");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");
  const confirmInput = $("input#confirm-input");
  const githubInput = $("input#github-input");

  signUpForm.on("submit", function(event) {
    event.preventDefault();

    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      github: githubInput.val().trim()
    };

    if (!userData.username || !userData.password || !userData.github) {
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
        handleLoginErr(err.responseJSON);
      });
  }

  function handleLoginErr(message) {
    $("#alert .msg").text(message);
    $("#alert").fadeIn(500);
  }
});
