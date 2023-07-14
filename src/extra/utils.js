export function tagsMiddleware ({ instantSearchInstance }) {
  return {
    subscribe() {
      setTimeout(()=> {
        //Tags Functions
        const tags = document.getElementsByClassName('tag');
        Array.prototype.forEach.call(tags, tag => {
          if (tag.nextElementSibling.children.length) {
            tag.style.display = 'block'
          } else {
            tag.parentNode.style.display = 'none';
          }
        });
      }, 200)

    }
  }
}
