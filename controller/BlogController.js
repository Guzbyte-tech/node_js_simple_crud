const Blog = require('../models/Blog');

const index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', {
            title: 'All Blogs',
            blogs: result
        })
    })
    .catch((err) => {
        console.error(err)
    })
}

const create = (req, res) => {
    res.render('blogs/create', {title: 'Create a new blog'})
}

const store = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    });
}

const show = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/show', {title: result.title, blog: result} )
        })
        .catch((err) => {
            res.status(404).render('404', {title: 'Page not Found'});
        })
}

const destroy = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: '/blogs'
            });
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    index,
    create,
    store,
    show,
    destroy
}