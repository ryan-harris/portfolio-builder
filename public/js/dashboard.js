$(() => {
  const $ghUsername = $("#ghUsername");
  const $editUserNameButton = $("#editghUsernameButton");
  const $ghUsernameContainer = $("#ghUserNameEditContainer");
  const $ghUsernameInput = $("#ghUsernameInput");

  $editUserNameButton.on("click", toggleEditingGhUsername);

  function toggleEditingGhUsername() {
    $ghUsername.toggle();
    $ghUsernameContainer.toggle();
    $ghUsernameInput.val("TylorKolbeck");
  }
});
