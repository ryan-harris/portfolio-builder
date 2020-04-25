$(() => {
  const removeBtn = $(".deleteUser");

  removeBtn.on("click", function() {
    const userId = $(this).data("user");

    $.ajax(`/api/${userId}`, {
      method: "DELETE"
    }).then(() => {
      location.reload();
    });
  });
});
