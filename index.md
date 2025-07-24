---
layout: base.njk
title: Home
---

<section><h1>Recent Blog Posts</h1></section>
{% for post in collections.post %}
    <div class="post-preview">
        <article>
            <h2><a href="/posts/{{ post.data.slug }}/">{{ post.data.title }}</a></h2>
            {% if post.data.date %}<h3 class="subtitle">{{ post.data.date | dateOnly }}</h3>{% endif %}
            <p>{{ post.data.desc }}</p>
            {% if post.data.image %}
            <img src="{{ post.data.image }}" alt="{{ post.data.title }}" width="500">
            {% endif %}</article>
    </div>{% endfor %}