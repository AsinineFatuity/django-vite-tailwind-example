## Django-Vite-Tailwind-Example
* This is a proof of concept for integrating django with react with vite in the hybrid format as described by Cory Zue in [this article](https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/integrating-javascript-pipeline/)
* The tools that have made this possible are:
1. [django-vite](https://github.com/MrBin99/django-vite) a python library that abstracts the complex linkages
2. [video-tutorial](https://www.youtube.com/watch?v=wgN04Byqi9c) by BugBytes on the same

It is to be noted however that I have moved beyond the simple usage and:
1. Implemented a full fledged react app with typescript
2. Redux workflow

## To Run The Project
1. Git clone the project 
2. Create and activate python virtual environment
3. Install python dependencies by `pip install -r requirements.txt` or equivalent
4. Install the Javascript packages by running `pnpm install` or equivalent 
    * Delete the `pnpm-lock.yml` if you are not using `pnpm`
5. In a separate terminal start the vite development server by running `pnpm run dev`
6. In a separate terminal start the django development server by running `./manage.py runserver`
7. Visit `http://127.0.0.1:8000` to see the proof of concept in action

## Notes on Production 
1. Ensure you set the `DJANGO_VITE["default"]["dev_mode"]` to `False`
2. Run `pnpm run build`
3. Run `./manage.py collectstatic`

## For the Curious Tinkerer
1. Read [the docs](https://github.com/MrBin99/django-vite) for django-vite and tweak relevant files to your heart content