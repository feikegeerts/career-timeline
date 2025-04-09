<script>
  let name = 'World';
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Welcome to my resume timeline project</p>
  
  <div class="card">
    <input bind:value={name} placeholder="Enter your name">
  </div>
  
  <p>
    This will soon be transformed into an interactive timeline showcasing my professional journey.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .card {
    margin: 2em 0;
  }

  input {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>