$(function () {
  $("#getProducts").on("click",function () {
    $.ajax({
      url: "/api/products",
      success: function(products){
        //console.log(products);
        let tbody = $('tbody');
        tbody.html('');
        products.forEach((item,index) => {
          tbody.append(`
            <tr class="table-info">
              <td class= "id">${item._id}</td>
              <td>
                  <input type="text" class="name" value="${item.name}"></input>
              </td>
              <td>
                <button class="update-button btn btn-outline-info">Update</button>
                <button class="delete-button btn btn-outline-danger">Delete</button>
              </td>
            </tr>
            `);
        })

      }
    });

  });

  $("#productForm").on("submit",function (event) {
    event.preventDefault();
    let newProduct = $('#newProduct');
    $.ajax({
      url:"/api/products",
      method: 'POST',
      data: {
        name: newProduct.val()
      },
      success: function (response) {
        console.log(response);
        $('#getProducts').click();
      }
    });
  });

  $("table").on("click",".update-button",function(event){
    // event.preventDefault();

    console.log("aqui works");
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let name = row.find('.name').val();

    $.ajax({
      url:'/api/products/'+id,
      method: 'PUT',
      data: {
        name:name
      },
      success: function (response) {
        console.log(response);
        $("#getProducts").click();
      }

    });
  });

  $("table").on("click",".delete-button",function (event) {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    $.ajax({
      url: "/api/products/"+id,
      method: "DELETE",
      success: function (response) {
        $("#getProducts").click();
        console.log(response);
      }

    });
  });
});
