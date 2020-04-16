// Loads contents first then tells the site what to do after a button is clicked
document.addEventListener('DOMContentLoaded',
function(){
  document.getElementById("quiz_select_submit").onclick =()=>{
    get_api_data('https://my-json-server.typicode.com/mmacatula/fake_resting_api_json/')
    };
  document.getElementById("move_on").onclick =()=>{
    get_api_data('https://my-json-server.typicode.com/mmacatula/fake_resting_api_json/')
    };

})
count = 0;
question_type = "";
current_question_one = "";
current_question_two ="";
number_of_questions_one = 0;
number_of_questions_two = 0;

data = "";
current_score =0;
question_id_one = 0;
question_id_two = 0;
answer ="";

function completetion(){
  document.getElementById("explanation").style.display = 'block';
  document.getElementById("login").style.display = 'none';
  document.getElementById("explanation_desc").innerHTML = `
  <h2>Explanation: ${current_question_one.explanation}</h2>`;
}

// Async await - Getting data from quiz
  let get_api_data = async (api_endpoint) =>{
    results = await fetch(api_endpoint);
    data = await results.json()
      document.getElementById("login").style.display = 'none'
      document.getElementById("encouragment_grid").style.display = 'none'
      document.getElementById("encouragment_selection").style.display = 'none'
      document.getElementById("explanation").style.display = 'none'
      current_question_one = data.Questions_Quiz1[count];
      current_question_two = data.Questions_Quiz2[count];
      console.log(count);
      number_of_questions_one = Object.keys(data.Questions_Quiz1).length;
      number_of_questions_two = Object.keys(data.Questions_Quiz2).length;
      console.log(number_of_questions_one);
      this.question_type_one = current_question_one.question_type;
      this.question_type_two = current_question_two.question_type;
      this.question_id_one = current_question_one.id;
      this.question_id_two = current_question_two.id;
      this.answer = current_question_one.correct_answers;
      if (document.getElementById("quizes").selectedIndex == 0) {
          generate_quiz_one()
          document.getElementById("quiz1").style.display = 'block'
        }
        else if (document.getElementById("quizes").selectedIndex == 1) {
          generate_quiz_two()
          document.getElementById("quiz2").style.display = 'block'
        }
}




function generate_quiz_one(){

  if(question_type_one == "Multiple choice"){
    document.getElementById("quiz_one_questions").innerHTML = `
    <form>
    <h2>${current_question_one.question}</h2>
      <input type="radio" value = ${current_question_one.options.optiona} name = ${current_question_one.options.optiona} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optiona}> ${current_question_one.options.optiona}</label><br>
      <input type="radio" value = ${current_question_one.options.optionb} name = ${current_question_one.options.optionb} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optionb}>${current_question_one.options.optionb}</label><br>
      <input type="radio" value = ${current_question_one.options.optionc} name = ${current_question_one.options.optionc} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optionc}> ${current_question_one.options.optionc}</label><br>
      <input type="radio" value = ${current_question_one.options.optiond} name=${current_question_one.options.optiond} onclick= "score_tracker(this.value)">
      <label>${current_question_one.options.optiond}</label><br>
    </form>`
  }
  else if (question_type_one == "TF") {
    document.getElementById("quiz_one_questions").innerHTML = `
    <form>
    <h2>${current_question_one.question}</h2>
      <input type="radio" value =${current_question_one.options.optiona} name ="true" onclick= "score_tracker(this.value)">
      <label for="true">${current_question_one.options.optiona}</label><br>
      <input type="radio" value = ${current_question_one.options.optionb} name = "false" onclick= "score_tracker(this.value)">
      <label for="false">${current_question_one.options.optionb}</label><br>
    </form>`
}
else if (question_type_one == "Fill in") {
  document.getElementById("quiz_one_questions").innerHTML =`
  <form>
  <h2>${current_question_one.question}</h2>
  <input type="text" id="fill_in_answer">
  <button type="button" onclick = "score_tracker(document.getElementById('fill_in_answer').value)">Submit</button>
  </form>`
}

  return false;
}

function generate_quiz_two(){

  for (var i = 0; i < number_of_questions_two; i++) {
    if(question_type_two == "Multiple choice"){
      document.getElementById("quiz_two_questions").innerHTML = `
      <form>
      <h2>${current_question_two.question}</h2>
        <input type="radio" value = ${current_question_two.options.optiona} name = ${current_question_two.options.optiona} onclick= "score_tracker(this.value)">
        <label for=${current_question_one.options.optiona}> ${current_question_one.options.optiona}</label><br>
        <input type="radio" value = ${current_question_two.options.optionb} name = ${current_question_two.options.optionb} onclick= "score_tracker(this.value)">
        <label for=${current_question_two.options.optionb}>${current_question_two.options.optionb}</label><br>
        <input type="radio" value = ${current_question_two.options.optionc} name = ${current_question_two.options.optionc} onclick= "score_tracker(this.value)">
        <label for=${current_question_one.options.optionc}> ${current_question_one.options.optionc}</label><br>
        <input type="radio" value = ${current_question_two.options.optiond} name=${current_question_two.options.optiond} onclick= "score_tracker(this.value)">
        <label>${current_question_two.options.optiond}</label><br>
      </form>`
    }
    else if (question_type_two == "TF") {
      document.getElementById("quiz_two_questions").innerHTML = `
      <form>
      <h2>${current_question_two.question}</h2>
        <input type="radio" value =${current_question_two.options.optiona} name ="true" onclick= "score_tracker(this.value)">
        <label for="true">${current_question_two.options.optiona}</label><br>
        <input type="radio" value = ${current_question_two.options.optionb} name = "false" onclick= "score_tracker(this.value)">
        <label for="false">${current_question_two.options.optionb}</label><br>
      </form>`
  }
  else if (question_type_two == "Fill in") {
    document.getElementById("quiz_two_questions").innerHTML =`
    <form>
    <h2>${current_question_two.question}</h2>
    <input type="text" id="fill_in_answer">
    <button type="button" onclick = "score_tracker(document.getElementById('fill_in_answer').value)">Submit</button>
    </form>`
  }
  if (question_id_two >= number_of_questions_two) {
    document.getElementById("complete").style.display = 'none'
    document.getElementById("complete").innerHTML = "<h1>DONE :)</h1>"
  }


console.log(number_of_questions);
return false;
}

}
function score_tracker(selected_answer){
  console.log(selected_answer);
  if (answer == selected_answer) {
      current_score = current_score + 1;
      encouragment()
        }
  else{
  completetion()
  }

    count = count +1;

return false;
}




function encouragment(){
  encouragments = ["Goodjob", "Well Done", "Keep It Going"]
  randomEncourgment = encouragments[Math.floor(Math.random()*encouragments.length)];
  document.getElementById("login").style.display = 'none'
  document.getElementById("quiz1").style.display = 'none'
  document.getElementById("quiz2").style.display = 'none'
  document.getElementById("explanation").style.display ='none'
  document.getElementById("encouragment_grid").style.display = 'block'
  document.getElementById("score").innerHTML = `: ${current_score}`;
    if(count <number_of_questions_one || count < number_of_questions_two){
    setTimeout(()=>{
      get_api_data('https://my-json-server.typicode.com/sguthrie16/CUS1172_Project_4/db')
    }, 1000);
  }
    else {
      completetion()
  }

return false;
}





















// function chose(){
//   document.getElementById("login").style.display = 'none';
//   if (document.getElementById("quizes").selectedIndex == 0) {
//     generate_quiz_one()
//   }
//   else if (document.getElementById("quizes").selectedIndex == 1) {
//     generate_quiz_two()
//   }
// }
//
//
//


//
//
//
//
//
