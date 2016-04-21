/**
 * Created by traverclifford on 4/20/16.*/

$(function () {
    addText("Upload a photo to guess your age", "");
    $('#files').change(function(){
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.card').empty();
            addText("Waiting", "");
            $('#image').attr('src', e.target.result);
            $('#myForm').submit();
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    });


    $('#myForm').submit(function() {
        $(this).ajaxSubmit({
            error: function (xhr) {
                $('.card').empty();
                addText('Error:', xhr.status);
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                $('.card').empty();
                console.log(response);
                var array = response.success.imageFaces;
                if (array.length == 0) {
                    addText('No faces found');
                }
                array.forEach(function(data){
                    addText('Age Range' ,data.age.ageRange);
                    addText('Gender', data.gender.gender);
                });
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });

    $('.upload').click(function(){
       $('#files').click();
    });
});

function addText(title, string) {
    var card = $('.card');
    if (title) {
        if (string) {
            card.append('<h3>' + title + ': ' + string + '</h3>');
        } else {
            card.append('<h3>' + title + '</h3>');
        }
    }
}

