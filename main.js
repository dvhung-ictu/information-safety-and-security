const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function toggleModal() {
  $('#btn-modal').classList.toggle('hidden')
  $('#modal').classList.toggle('hidden')
}

function typeSecurity() {
  const listBtn = $$('.btn-type__event')
  for(const element of listBtn) {
    element.addEventListener('click', () => {
      console.log(element)
    })
  }
}


