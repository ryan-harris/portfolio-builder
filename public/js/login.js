$(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }

    addSpinner();

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace("/dashboard");
        // If there's an error, log the error
      })
      .catch(function(err) {
        removeSpinner();
        if (err.status === 401) {
          handleLoginErr("Incorrect username or password");
        } else {
          handleLoginErr(err.response);
        }
      });
  }

  function addSpinner() {
    $(".uk-container").append(
      "<div id ='spinner'><span class = 'uk-position-center' uk-spinner='ratio: 4.5'></span></div>"
    );
    loginForm.css("opacity", "0");
  }

  function removeSpinner() {
    $("#spinner").remove();
    loginForm.css("opacity", "100");
  }

  function handleLoginErr(message) {
    $("#alert .msg").text(message);
    $("#alert").fadeIn(500);
  }
});
