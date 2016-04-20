/**
 * Created by traverclifford on 4/20/16.*/


$('#files').change(function(){
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});

$('#btnSubmit').click(function(){
    $('form[name=new_upload]').submit(function(){
        console.log('hree');
        $.post($(this).attr('action'), $(this).serialize(), function(json) {
            alert(json);
        }, 'json');
        return false;
    });
});