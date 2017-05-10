$(document).ready(function() {
  ymaps.ready(init);
  var myMap,
    myPlacemark;

  function init() {
    myMap = new ymaps.Map("map", {
      center: [50.434726, 30.423395],
      zoom: 13
    });

    myPlacemark = new ymaps.Placemark([50.447223, 30.431463], {
      hintContent: 'Украина, г. Киев, Гарматная, 26/2',
      balloonContent: 'Офис<br/>Украина, г. Киев, Гарматная, 26/2'
    });

    myPlacemark2 = new ymaps.Placemark([50.416353, 30.409985], {
      hintContent: 'Украина, г. Киев, Якутская, 7',
      balloonContent: 'Производства<br/>Украина, г. Киев, Якутская, 7'
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(myPlacemark2);
  }
});
