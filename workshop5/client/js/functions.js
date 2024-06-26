function assignEditEvents() {
  for (let el of document.getElementsByClassName('edit_button')) {
      el.addEventListener('click', (e) => {
      console.log(e.target.id);
      alert(`element with id ${e.target.id} clicked`);
      e.preventDefault();
      });
  }
}

async function getCourses() {
  const sortOrder = document.getElementById('sortOrder').value;
  const response = await fetch(`http://localhost:3001/api/courses?sort=${sortOrder}`);
  const teachers = await response.json();

  if(teachers) {
    const container = document.getElementById('result');
    container.innerHTML = '';
    teachers.forEach(element => {
      const item = document.createElement('li');
      item.innerHTML = `${element.name} <a href="" class="edit_button" id="${element._id}">Edit</a>`;
      item.setAttribute('data-id',element._id);
      container.appendChild(item);
    });

    assignEditEvents();
  }
}

async function createCourse() {
  let course = {
      name: document.getElementById('name').value,
      credits: document.getElementById('credits').value
  };

  const response = await fetch("http://localhost:3001/api/courses", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
  });

  assignEditEvents();
}
