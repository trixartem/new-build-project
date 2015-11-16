var changeSelect = require('./select')();

module.exports = function () {
    window.initMap = function () {
        var map;
        var styles = [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#808080"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#FFBB00"
                    },
                    {
                        "saturation": 43.4
                    },
                    {
                        "lightness": 37.6
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4b4b4b"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#00FF6A"
                    },
                    {
                        "saturation": -1.0989010989011234
                    },
                    {
                        "lightness": 11.200000000000017
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d5d5d5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#FFC200"
                    },
                    {
                        "saturation": -61.8
                    },
                    {
                        "lightness": 45.599999999999994
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b4b4b4"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#272727"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#FF0300"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 51.19999999999999
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#FF0300"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 52
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#a4a4a4"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#0078FF"
                    },
                    {
                        "saturation": -13.200000000000003
                    },
                    {
                        "lightness": 2.4000000000000057
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b7e6dd"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            }
        ];
        var $map = $('#map');
        var places = $map.data('places');
        var center = $map.data('center');
        var zoom = $map.data('zoom');
        var mapOptions = {
            zoom: zoom  || 14,
            center: center,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            streetViewControl: false,
            scaleControl: true,
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            styles: styles
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var markers = [];
        var icons = {
            check: { url: './image/icon_maps_checked.svg', labelOrigin: new google.maps.Point(21, 23) },
            uncheck: { url: './image/icon_maps_unchecked.svg', labelOrigin: new google.maps.Point(21, 23) }
        };
        var labels = {
            uncheck: {
                text: '',
                color: '#fff',
                fontSize: '28px',
                fontWeight: 'bold'
            },
            check: {
                text: '',
                color: '#37b39c',
                fontSize: '28px',
                fontWeight: 'bold'
            }
        };
        if (places.length === 1) {
            markers.push(new google.maps.Marker({
                position: places[0],
                map: map,
                title: 'Hello World!',
                icon: { url: './image/icon_maps_named.svg' }
            }));

        } else {
            places.forEach(function (place, index) {
                var label = $.extend({}, (index === 0 ? labels.check : labels.uncheck), { text: index + 1 + '' });

                markers.push({
                    position: place,
                    map: map,
                    title: 'Нужный адрес',
                    label: label,
                    icon: index === 0 ? icons.check : icons.uncheck
                })
            })
            markers.forEach(function (marker, index) {
                var gMarker = new google.maps.Marker(marker);

                gMarker.addListener('click', function () {
                    changeSelect(Number(gMarker.label.text));
                    uncheck(markers);
                    check(gMarker);
                })
                markers[index] = gMarker;
            });
            var contacts = $('.gmaps__contacts');
            $('.select-map').on('change', function (e, data) {
                uncheck(markers);
                check(markers[Number(data.id) - 1]);
            })

            function check(gMarker) {
                var label = $.extend({}, labels.check, { text: gMarker.label.text });
                contacts.addClass('_hidden');
                contacts.eq(Number(gMarker.label.text) - 1).removeClass('_hidden');
                gMarker.setLabel(label);
                gMarker.setIcon(icons.check);
            }

            function uncheck(gMarkers) {
                gMarkers.forEach(function (gMarker) {
                    var label = $.extend({}, labels.uncheck, { text: gMarker.label.text });

                    gMarker.setLabel(label);
                    gMarker.setIcon(icons.uncheck);
                })
            }
        }

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        !center && map.fitBounds(bounds);
    }

}
