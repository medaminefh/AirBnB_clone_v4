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

	const urlPlaces = "http://0.0.0.0:5001/api/v1/places_search/"
    $.post({
		url: urlPlaces,
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (places) => {
			places.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});
});
