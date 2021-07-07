/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

'use strict';

document.addEventListener('DOMContentLoaded', () => { //'DOMContentLoaded'-позволяет запускать код только после полной загрузки DOM-структуры 
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'), //получаем доступ к form, у которой есть класс add
        addInput = addForm.querySelector('.adding__input'), //находим класс adding__input
        checkbox = addForm.querySelector('[type="checkbox"]'); //внутри формы ищем checkbox (через аттрибуты), таким образом мы выделем галочку которая понадобится внутри формы

    addForm.addEventListener('submit', (event) => { //навешиваем обработчик события('submit'), чтобы отследить отправку формы
        event.preventDefault(); //отменяем перезагрузку страницы при нажатии на кнопку "Подтвердить"

        let newFilm = addInput.value; //через новую переменную обращаемся к value, который есть внутри Input, чтобы проверить, какой фильм добавил пользователь с список
        const favorite = checkbox.checked; //через новую переменную обращаемся к checkbox, чтобы через булиновое значение получать когда галочка отмечена, а когда нет

        if (newFilm) { //создаем условие, при котором оно будет выполняться если в value будет что-то написано

            if (newFilm.length > 21) { //создаем условие при котором, если в названии фильма будет >21 символа, то ставим ...
                newFilm = `${newFilm.substring(0, 22)}...`; //исп метод substring и при помощи интерполяции указываем, что начиная с 0 и заканчивая 22 символом, не включая его, мы ставим ...
                if (favorite) {
                    console.log("Добавляем любимый фильм");
                }
            }
            movieDB.movies.push(newFilm); //обращаемся к movieDB.movies и отправляем в него, через push, написанный пользователем фильм(newFilm)
            sortArr(movieDB.movies); //подставляем ф-цию сортировки по алфавиту

            createMovieList(movieDB.movies, movieList);
        }

        addForm.reset(); //очищаем форму - обращаемся к самой форме addForm и вызываем метод reset()
    });

    const deleteAdv = (arr) => { //удаляем рекламу на странице
        arr.forEach(item => {
            item.remove();
        });
    };

    deleteAdv(adv); //запускаем ф-цию по удалению рекламы

    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';

    };

    makeChanges();

    const sortArr = (arr) => {
        arr.sort();
    };

    sortArr(movieDB.movies); //сортируем movieDB.movies

    movieDB.movies.sort();

    function createMovieList(films, parent) {
        movieList.innerHTML = "";
        sortArr(films); //сортируем оставшиеся фильмы по алфавиту после удаления со страницы

        films.forEach((film, i) => { //добавляем в список просмотренных фильмов написанный пользователем фильм 
            parent.innerHTML += ` 
                <li class="promo__interactive-item">${i + 1} ${film} 
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { //удаляем фильм из списка при клике на иконку корзины, где btn-это сама икнока с корзиной, а i-номер по порядку
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(movieDB.movies, movieList); //вызываем это ф-цию, чтобы при удалении какого-то фильма вся нумерация выставлялась в правильном порядке
            });
        });
    }

    createMovieList(movieDB.movies, movieList);

});