$(function() {
  $("a").on('click', function() {
    const elementClick = $(this).attr("href");
    const destination = $(elementClick).offset().top - 200;

    $('html, body').animate({
      scrollTop: destination
    }, 1000);

    return false;
  });

  $(function() {
    $(".watermark").watermark({
      path: '../images/watermark.png'
    });
  });

  const latlng = [50.43089528000415, 30.399458837066707]
	const customMarker = L.icon({
		iconUrl    : '/images/location.svg',
		iconSize   : [38, 38],
		iconAnchor : [22, 38],
		popupAnchor: [-3, -76]
	})

  if (document.getElementById('map')) {
    const map = L.map('map').setView(latlng, 13)

    L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
		).addTo(map)

		L.marker(
      [50.43089528000415, 30.399458837066707],
      {
        icon: customMarker,
        title: 'Офис'
      }
    )
    .addTo(map)
    .bindPopup("<b>Офис</b><br>Украина, г. Киев, ул. Пшеничная, 2")
    .openPopup()

		L.marker(
      [50.416353, 30.409985],
      {
        icon: customMarker,
        title: 'Производство'

      }
    )
    .addTo(map)
    .bindPopup("<b>Производство</b><br>Украина, г. Киев, Якутская, 7")
  }

  var swiper = new Swiper('.container', {
    nextButton: '.button-next',
    prevButton: '.button-prev',
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true
  })
});