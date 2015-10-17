var getIcon = function(id) {
  if(id >= 200 && id < 300){
    return "RAIN";
  } else if (id >= 300 && id < 500){
    return "SLEET";
  } else if (id >= 500 && id < 600){
    return "RAIN";
  } else if (id >= 600 && id < 700){
    return "SNOW";
  } else if (id >= 700 && id < 800){
    return "FOG";
  } else if (id === 800){
    return "CLEAR_DAY";
  } else if (id >= 801 && id < 803){
    return "PARTLY_CLOUDY_DAY";
  } else if (id >= 802 && id < 900){
    return "CLOUDY";
  } else if (id === 905 || (id >= 951 && id <= 956)){
    return "WIND";
  } else if (id >= 900 && id < 1000){
    return "RAIN";
  }
}

export { getIcon }
