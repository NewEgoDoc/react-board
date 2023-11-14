FROM nginx
WORKDIR /home/j/react-board
CMD "npm","run","start"
COPY build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

