var contents;
function readSingleFile(e) {
  console.log('working');
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    displayContents(contents);
    //console.log(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  //var element = document.getElementById('file-content');
  //element.textContent = contents;
  $('#code').val(contents);
}

$('#file-input').change(readSingleFile);