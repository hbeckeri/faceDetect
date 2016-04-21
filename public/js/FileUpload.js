/**
 * Created by traverclifford on 4/20/16.*/

$(function () {

    $('#files').change(function(){
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
            $('#myForm').submit();
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    });


    $('#myForm').submit(function() {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                console.log(response);
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
});

