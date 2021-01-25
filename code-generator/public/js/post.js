$('#btn').click(function () {
    $("#output").text("Loading....");

    $.ajax({
        type: 'POST',
        url: '',
        dataType: 'json',
        cache: false,
        async: true,
        data: {
            source_code: $("#code").val()
        },
        success: function (json) {
            console.log(JSON.stringify(json));
            if (json.stderr == null)
                $("#output").text(json.stdout);
            else
                $("#output").text(json.stderr);

            alert(json.status.description);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });

});