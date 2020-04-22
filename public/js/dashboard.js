$(() => {
  const $ghUsername = $("#ghUsername");
  const $editUserNameButton = $("#editghUsernameButton");
  const $ghUsernameInput = $("#ghUserNameInput");

  $editUserNameButton.on("click", toggleEditingGhUsername);

  function toggleEditingGhUsername() {
    $ghUsername.toggle();
    $ghUsernameInput.toggle();
  }
});
