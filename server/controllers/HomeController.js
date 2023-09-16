export const HomeController = async(req, res) => {
    console.log("Home page displayed.")
    res.send("<h1>Home page displayed.</h1>")
}