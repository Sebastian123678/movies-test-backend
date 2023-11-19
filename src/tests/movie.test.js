const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test("GET '/movies' debe traer todos los peliculas", async() => { 
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("POST '/movies' debe crear una pelicula", async() => {
    const movie = {
        name: "Rapidos y furiosos 5",
        image: "https://m.media-amazon.com/images/S/pv-target-images/62675165469e9e6ea719488623ed05260cafa2ae2c173b59d914460bdf459b11.jpg",
        synopsis: "Los viejos amigos Dominic y Mia Toretto y Brian O'Conner se encuentran ahora en Río de Janeiro, donde pretenden dar un último golpe con el fin de obtener su libertad. Para ello reúnen a un grupo de élite de pilotos experimentados.",
        releaseYear: 2011
    };
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
})

test("PUT '/movies/:id' debe actualizar una pelicula", async () => {
    const movie = {
        name: "Rapidos y furiosos 5 Actualizado"
    };
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "Dwayne",
        lastName: "Johnson",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/220px-Dwayne_Johnson_2014_%28cropped%29.jpg",
        birthday: "1972-05-2"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "Louis",
        lastName: "Leterrier",
        nationality: "Frances",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Louis-Leterrier-Incroyable-Hulk.JPG/260px-Louis-Leterrier-Incroyable-Hulk.JPG",
        birthday: "1973-06-17"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy(); //! limpiar
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name: "Terror"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy(); //! limpiar
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("DELETE '/movies/:id' debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)  
});