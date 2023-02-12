/*
from this react compo we will ajax call to the server and get the data and than render here
*/

const App = () => {

  const [products, setProducts] = React.useState([]);

  const [form, setForm] = React.useState({
    name: '',
    price: ''
  });


  React.useEffect(() => {
    fecthProducts();
  }, [])

  function fecthProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name && !form.price) {
      return;
    }
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        fecthProducts();
        setForm({ name: '', price: '' })
      })

  }

  function updateForm(e, field) {
    if (field === 'name') {
      setForm({
        ...form,
        name: e.target.value
      })
    }
    else if (field === 'price') {
      setForm({
        ...form,
        price: e.target.value
      })
    }
  }

  function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        fecthProducts()
        console.log(data)
      })
  }

  // setForm({
  //   ...form,
  //   [field] : e.target.value
  // });

  //  2 way binding is onchange event???

  return (
    <>

      <h1>app from react </h1>
      <div>Add a product</div>
      <div>
        <form >
          <input type="text" value={form.name}
            onChange={(e) => updateForm(e, 'name')}
            placeholder="product name" />
          <input type="number" value={form.price}
            onChange={(e) => updateForm(e, 'price')}
            placeholder="product price" />
          <button onClick={handleSubmit} >Add</button>
        </form>
      </div>
      <ul>
        {
          products.map((e, i) => {
            return (
              <li style={{
                display: 'flex',
                flex: '5',
                maxWidth: '40%'
              }} key={i}>
                <div
                  style={{
                    display: 'flex',
                    flex: '4',
                    margin: '15px'
                  }}
                >
                  <strong> {e.name}</strong>
                  ${e.price}
                </div>
                <button
                  onClick={() => deleteProduct(e.id)}
                  style={{
                    // display: 'flex',
                    flex: '2',
                    padding: '5px',
                    border: 'none',
                    margin: '10px',
                    cursor: 'pointer'
                  }}
                >DELETE</button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));