/**
 * Created by traverclifford on 4/20/16.*/

$(function () {
    var c = document.getElementById("image");
    var ctx = c.getContext("2d");

    addText("Upload a photo to guess your age", "");
    $('#files').change(function(){
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.card').empty();
            addText("Scanning Image", "");
            addSpinner();
            $('#myForm').submit();

            var img = new Image();
            img.onload = function(){
                c.width = img.width;
                c.height = img.height;
                ctx.font="30px Open Sans Condensed";
                ctx.fillStyle = 'red';
                ctx.lineWidth = "3";
                ctx.strokeStyle = "red";
                ctx.drawImage(img,0,0);
            };
            img.src = event.target.result;
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
                if(response.error) {
                    addText('No faces were found');
                } else {
                    var array = response.success.imageFaces;
                    if (array.length == 0) {
                        addText('No faces found');
                    }
                    insertTable();
                    var i = 1;
                    array.forEach(function(data){
                        insertRow(i, data.age.ageRange, data.gender.gender.toLowerCase());
                        //Draw image on face
                        ctx.rect(data.positionX,data.positionY,data.width,data.height);
                        ctx.stroke();
                        ctx.fillText(i.toString(), data.positionX - 10, data.positionY - 10);
                        i++;
                    });
                }
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

function addSpinner() {
    $('.card').append('<div class="loader"></div>');
}

function insertTable() {
    var card = $('.card');
    card.append('' +
        '<table class="table">' +
        '<thead>' +
        '<th>#</th>' +
        '<th>Age</th>' +
        '<th>Gender</th>' +
        '</thead>' +
        '<tbody></tbody>' +
        '</table>'
    );
}

function insertRow(num, age, gender) {
    var table = $('.card table');
    table.append('' +
        '<tbody>' +
        '<th scope="row">' + num + '</th>' +
        '<td>' + age + '</td>' +
        '<td>' + gender + '</td>' +
        '</tbody>'
    );
}
