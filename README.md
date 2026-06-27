# B9122-09.03.04-Kiselev_Pavel-Metriki_Intensivnosti
Программное средство для введения, обработки и редактирования метрик оценки безопасности движения судов.

<h2>Запуск</h2>
git clone [https://github.com/Pashinuyk/MarineTraffic_QualWork](https://github.com/DepartmentOfSoftwareEngineeringFEFU/B9122-09.03.04-Kiselev_Pavel-Metriki_Intensivnosti)<br>
cd B9122-09.03.04-Kiselev_Pavel-Metriki_Intensivnosti<br>

pythom -m venv venv<br>
source venv/Scripts/activate<br>
pip install -r requirements.txt<br>
cd marine_traffic<br>
python manage.py makemigrations<br>
python manage.py migrate<br>
python manage.py runserver<br>

Далее необходимо открыть второй терминал, открыть в нём папку B9122-09.03.04-Kiselev_Pavel-Metriki_Intensivnosti и прописать следующее:<br>
cd marine_traffic<br>
cd frontend<br>
npm install<br>
npm start<br>

<h2>Руководство по использованию:</h2>
1. В веб-интервейсе React (http://localhost:3000/) стоит необходимо загрузить файл - он имеется в директории проекта (dataset.csv)
<img width="720" height="354" alt="Screenshot_6914" src="https://github.com/user-attachments/assets/b96b2548-38ae-4b5a-af17-dd13a27c320d" />


2. После этого можно начать вычислять метрики. В левом меню в разделе "метрики для отображения" необходимо выбрать одну из метрик, после нажать на кнопку снизу "вычислить
<img width="720" height="354" alt="Screenshot_6915" src="https://github.com/user-attachments/assets/74082823-108d-4d92-9440-2746b5a5a1e9" />


3. На карте визуализированы результаты вычислений. Их можно также экспортировать в файл - необходимая кнопка есть в правом меню
<img width="720" height="354" alt="Screenshot_6916" src="https://github.com/user-attachments/assets/73b9cf4a-ceae-426d-a51c-496d0d0ed79c" />


4. При необходимости создать собственную метрику нужно перейти в API (http://127.0.0.1:8000/api/metrics/). В его меню можно выбирать различные характеристики, на основе которых будут вычисляться метрики, после чего отправлять.
<img width="744" height="430" alt="Screenshot_6917" src="https://github.com/user-attachments/assets/52ea5f1c-2ff1-40b6-9eda-fae2aa62ac22" />


5. После создания новой метрики в React-интерфейсе в левом меню в разделе "метрики для отображения" необходимо нажать на кнопку "обновить", после чего новая метрика появится в списке.
