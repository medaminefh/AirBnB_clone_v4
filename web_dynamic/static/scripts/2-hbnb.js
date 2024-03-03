$("document").ready(function() {
    const amenities = {};
    $('input[type="checkbox"]').change(function() {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        const amenityList = Object.values(amenities);
        if (amenityList.length > 0) {
            $('.amenities h4').text(amenityList.join(', '));
        } else {
            $('.amenities h4').html('&nbsp;');
        }
    });

    const urlStatus = "http://0.0.0.0:5001/api/v1/status/";
    $.get(urlStatus, function(data, textStatus) {
        if (textStatus === "success") {
            $("#api_status").addClass("available");
        }
        else {
            $("#api_status").removeClass("available");
        }
    });
});
