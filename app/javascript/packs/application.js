// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import { Application } from "stimulus"
import HomeController from "./controllers/home_controller.js"
import * as ActiveStorage from "@rails/activestorage"
import "@hotwired/turbo-rails"
import "channels"

ActiveStorage.start()
const application = Application.start()
application.register("home", HomeController)
