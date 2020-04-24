$(() => {
  const ghUsername = $("#ghUsername");
  const editUserNameButton = $("#editghUsernameButton");
  const ghUsernameContainer = $("#ghUserNameEditContainer");
  const ghUsernameInput = $("#ghUsernameInput");
  const saveProfile = $("#saveProfile");
  const cancelProfile = $("#cancelProfile");
  const profileImg = $("#profileImg");
  const aboutMe = $("#aboutMe");
  const displayName = $("#displayName");
  const profileSection = $("#profileSection");
  const repoCheckbox = $(".toggle-repo");
  const cancelUsername = $("#cancelUsername");
  const saveUsername = $("#saveUsername");

  editUserNameButton.on("click", toggleEditingGhUsername);

  function toggleEditingGhUsername() {
    ghUsername.toggle();
    ghUsernameContainer.toggle();
  }

  cancelUsername.on("click", function(event) {
    event.preventDefault();

    ghUsernameInput.val(ghUsernameInput.data("init"));

    ghUsername.toggle();
    ghUsernameContainer.toggle();
  });

  saveUsername.on("click", function(event) {
    event.preventDefault();

    const updateData = {
      ghUsername: ghUsernameInput.val().trim()
    };

    $.ajax("/api/profile/github", {
      type: "PATCH",
      data: updateData
    }).then(() => {
      location.reload();
    });
  });

  saveProfile.on("click", event => {
    event.preventDefault();

    const updateData = {
      profileImg: profileImg.val().trim(),
      aboutMe: aboutMe.val().trim(),
      displayName: displayName.val().trim()
    };

    // send profile image and about me to serer
    $.ajax("/api/profile", {
      type: "PATCH",
      data: updateData
    }).then(() => {
      // update init data to new values
      profileImg.data("init", profileImg.val().trim());
      aboutMe.data("init", aboutMe.val().trim());
      displayName.data("init", displayName.val().trim());
    });

    // collapse accordion
    UIkit.accordion(profileSection).toggle(0, true);
  });

  cancelProfile.on("click", event => {
    event.preventDefault();

    profileImg.val(profileImg.data("init"));
    aboutMe.val(aboutMe.data("init"));
    displayName.val(displayName.data("init"));

    // collapse accordion
    UIkit.accordion(profileSection).toggle(0, true);
  });

  repoCheckbox.on("click", function() {
    const repoid = $(this).data("repoid");
    const updateData = {
      included: $(this).prop("checked")
    };

    $.ajax(`/api/repo/include/${repoid}`, {
      type: "PATCH",
      data: JSON.stringify(updateData),
      contentType: "application/json; charset=UTF-8"
    });
  });
});
