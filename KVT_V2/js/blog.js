// function assignMonth() {
//   const months = [ "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC" ];
//   var dt = new Date();
//   var mNum = dt.getMonth();
//   let m = "";

//   m = months[mNum];

//   $('#date-month').val(m);
// }

function assignDateTime() {
  var dt = new Date();
  var fullDate = dt.toDateString().toUpperCase();
  var th = dt.getHours();
  var tm = dt.getMinutes();
  var ampm = th >= 12 ? 'PM' : 'AM';
  var th12 = th > 12 ? (th - 12) : th;

  $('#date-time').val(fullDate + " | " + th12 + ":" + tm + " " + ampm);

  var fullDateTime = fullDate + " | " + th12 + ":" + tm + " " + ampm;
  return fullDateTime;
}

// function assignDay() {
//   const days = [ "SUN","MON","TUE","WED","THR","FRI","SAT" ];
//   var dt = new Date();
//   var dNum = dt.getDay();
//   let d = "";

//   d = days[dNum];
  
//   $('#date-time').val(d);
// }

function handlePostClick() {
  $('#btn-add-entry').on('click', function(e) {
    e.preventDefault();

    let postText = $('#blog-text').val();

    // blogPosts.push(postText);
    // console.log(blogPosts);

    $('#blog-text').val("");

    if (postText === "" || postText == null) {
      return false;
    } else {
      $('#blog-post').prepend(
        `<p class="blog-date-time">${assignDateTime()}</p>
        <p class="blog-p">${postText}</p>`
      );
    }

  });
}

function handleSubmit() {
  $('#blog-form').on('submit', function(e) {
    e.preventDefault();

  });
}

function startBlog() {
  assignDateTime();
  handlePostClick();
}

$(startBlog);