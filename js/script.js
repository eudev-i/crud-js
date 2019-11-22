$(document).ready(function() {
  tipo = "";

  $("#btInsere").click(function() {
    $("#form")[0].reset();
    $("#modalInsere").modal("show");
    tipo = $(this).data("tipo");
  });

  $("#btAdd").click(function() {
    var nome = $("#txtNome").val();
    var mail = $("#txtMail").val();
    var celular = $("#txtCelular").val();

    cont = $("#tabela tbody tr").length + 1;

    if (nome == "" || mail == "" || celular == "" || isNaN(celular)) {
      alert("Dados incorretos...");
      $("#form")[0].reset();
      return;
    } else {
      if (tipo == "N") {
        bloco = "<tr>";
        bloco += '<td class="text-center">' + cont + "</td>";
        bloco += '<td class="text-left">' + nome + "</td>";
        bloco += '<td class="text-left">' + mail + "</td>";
        bloco += '<td class="text-right">' + celular + "</td>";
        bloco += '<td class="text-center">';
        bloco +=
          '  <button class="btn btn-success btn-sm btEdit" data-tipo="E">';
        bloco += '      <i class="fa fa-edit"></i> Editar';
        bloco += "  </button>";
        bloco += "</td>";
        bloco += '<td class="text-center">';
        bloco += '  <button class="btn btn-danger btn-sm btApagar">';
        bloco += '      <i class="fa fa-times"></i> Apagar';
        bloco += "  </button>";
        bloco += "</td>";
        bloco += "</tr>";

        $("#tabela tbody").append(bloco);
        $("#form")[0].reset();
      } else {
        $(".editado")
          .find("td:eq(1)")
          .html(nome);
        $(".editado")
          .find("td:eq(2)")
          .html(mail);
        $(".editado")
          .find("td:eq(3)")
          .html(celular);

        $(".editado").removeClass("editado");
      }
      $("#modalInsere").modal("hide");
    }
  });

  $(document).on("click", ".btEdit", function() {
    el = $(this).closest("tr");

    nome = el.find("td:eq(1)").html();
    mail = el.find("td:eq(2)").html();
    celular = el.find("td:eq(3)").html();

    $("#txtNome").val(nome);
    $("#txtMail").val(mail);
    $("#txtCelular").val(celular);

    $(this)
      .closest("tr")
      .addClass("editado");

    $("#modalInsere").modal("show");

    tipo = $(this).data("tipo");
  });

  $(document).on("click", ".btApagar", function() {
    $(this)
      .closest("tr")
      .addClass("apagar");
    bootbox.confirm({
      message:
        "<img src='images/scaredBaby.jpg' class='w-100' alt='' /><br />Tem certeza que deseja apagar essa linha?",
      buttons: {
        confirm: {
          label: "SIM",
          className: "btn-success"
        },
        cancel: {
          label: "NÃO",
          className: "btn-danger"
        }
      },
      callback: function(result) {
        if (result) {
          $(".apagar").remove();
        } else {
          $(".apagar").removeClass("apagar");
        }
      },
      size: "small"
    });
  });
});
