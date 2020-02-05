---
id: introduction
title: Introduction
sidebar_label: Understanding Cezanne
---

**Cezanne** is an image generator for **Node.js**, built to make it easy to dynamically generate open graph and social images.

<img src="/cezanne/img/misc/introduction.png" width="300" style="max-width:90vw;" />

## An typical use case

Imagine you're building a blog, and you want to publish a new post. \
You have to open up **Photoshop**/**Sketch**/**Figma** (or other great tools) and you have to design down the **open graph** image, the **Instagram** post, the **Instagram** story, the **Facebook** post and so on... what a mess! \
Most of the time you may end up using the same template for every blog post, which makes this task easy to repeat for every new article.

But why don't you write down the template using **React**, **Vue**, **Angular**, **Svelte**... or even just plain HTML? \
Here comes **Cezanne**!

When you're building your blog, you can design a page that only renders the layout for (let's say) an open graph image for your blog post:

<img src="/cezanne/img/misc/server-rendering-example.gif" style="max-width:90vw;" />

Great! Now that we have a server that renders a given template, we can use **Cezanne** to generate the open graph image just telling the URL of the page you previously designed!
