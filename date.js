
//jshint esversion:6




exports.getDate = function(){
  let today = new Date();

  let day = today.getDay();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "short"
  };

  let now = today.toLocaleDateString("en-US", options);

  return now;

}

exports.getDay = function(){
  let today = new Date();

  let day = today.getDay();

  let options = {
    weekday: "long"
  }

  let now = today.toLocaleDateString("en-US", options);

  return now;


}
