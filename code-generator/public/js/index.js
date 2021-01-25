let file;
window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('filecontents');
                    file = fileReader.result.toString();
                    console.log(file);
                    fileContents.innerText = fileReader.result;
                }
                fileReader.readAsText(fileTobeRead);
            } else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    } else {
        alert("Arquivo(s) não suportado(s)");
    }
}

$('#btn').click(function () {
    //$("#output").text("Loading....");

    $.ajax({
        type: 'POST',
        url: '',
        dataType: 'json',
        cache: false,
        async: true,
        data: {
            language_id: parseInt(71),
            source_code: JSON.stringify(file),
            stdin: "",
            expected_output: "",
            cpu_time_limit: parseInt(3000)
        },
        success: function (json) {
            console.log(JSON.stringify(json));


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });

});