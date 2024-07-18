from fastapi import FastAPI, Form, Request, status
from fastapi.responses import HTMLResponse, FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn

app = FastAPI()
# Mount the static directory to serve static files
app.mount("/", StaticFiles(directory=".", html=True), name="static")

@app.get("/", response_class=HTMLResponse)
async def index():
    print('Request for index page received')
    with open("index.html", "r") as file:
        return HTMLResponse(content=file.read(), status_code=200)
# @app.get('/favicon.ico')
# async def favicon():
#     file_name = 'favicon.ico'
#     file_path = './static/' + file_name
#     return FileResponse(path=file_path, headers={'mimetype': 'image/vnd.microsoft.icon'})

@app.post('/hello', response_class=HTMLResponse)
async def hello(request: Request, name: str = Form(...)):
    if name:
        print('Request for hello page received with name=%s' % name)
        return templates.TemplateResponse('hello.html', {"request": request, 'name':name})
    else:
        print('Request for hello page received with no name or blank name -- redirecting')
        return RedirectResponse(request.url_for("index"), status_code=status.HTTP_302_FOUND)

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8002)