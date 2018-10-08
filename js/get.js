$(document).ready(function () {

    var booksList = $("#titles-list");

    function getBooks() {
        $.ajax({
            url: "http://localhost:8282/books/",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {
            booksList.clear;
            for (var i = 0; i < result.length; i++) {
                var newUl = $("<ul>").attr("class", "list-group-item").attr("class", "p-3 mb-2 bg-secondary text-white").data("id", result[i].id).text(result[i].title).appendTo(booksList);
                $("<div>").attr("class", "book-description").data("clicked", "no").slideUp().appendTo(newUl);
            }

        }).fail(function (xhr, status, err) {
        });
    }

    getBooks();

    booksList.on("click", "ul", function () {
        var id = $(this).data("id");


        var idField = "ID: ";
        var titleField = "Tytuł: ";
        var authorField = "Autor: ";
        var publisherField = "Wydawca: ";
        var typeField = "Typ: ";
        var isbnField = "ISBN: ";

        var div = $(this).find(".book-description");

        if (div.data("clicked") == "no") {
            var url = "http://localhost:8282/books/" + id;
            $.ajax({
                url: url,
                data: {},
                type: "GET",
                dataType: "json"
            }).done(function (result) {
                var bookDetails = result;

                var currentBookId = $("<li>").text(idField + bookDetails.id).appendTo(div);
                var currentBookTitle = $("<li>").text(titleField + bookDetails.title).insertAfter(currentBookId);
                var currentBookAuthor = $("<li>").text(authorField + bookDetails.author).insertAfter(currentBookTitle);
                var currentBookPublisher = $("<li>").text(publisherField + bookDetails.publisher).insertAfter(currentBookAuthor);
                var currentBookType = $("<li>").text(typeField + bookDetails.type).insertAfter(currentBookPublisher);
                var currentBookIsbn = $("<li>").text(isbnField + bookDetails.isbn).insertAfter(currentBookType);
                div.data("clicked", "yes");
            }).fail(function (xhr, status, err) {
            });
            }

        div.slideToggle();
    });

});