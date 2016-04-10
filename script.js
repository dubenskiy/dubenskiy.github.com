/**
 * Created by Андрей on 10.04.2016.
 */

'use strict';

angular.module('storeApp', []).controller('storeController', function ($scope, $log) {

    $scope.baskets = [];
    $scope.prices = [];

    /**
     * Добавить новый продукт
     * baskets - массив эллементов для корзины
     * name - имя товара
     * price - цена товара
     * priceInteger - целое от цены
     * discountPriceInteger - цена со скидкой, целое
     * discountRemainder - остаток от скидки
     * indexMaxPrice - индекс самого дорого товара
     * discountIntegerAll - сумма скидки по всем товарам, целое
     * discountRemainderAll - сумма скидки по всем товарам, остаток
     * prices - массив цен
     * currentDiscountMaxPrice - текущее значение максимальнгой цены со скидкой, целое
     * @param name
     * @param price
     */
    $scope.addItem = function (name, price) {

        if ($scope.check(price, $scope.baskets)) {

            $scope.baskets.push({
                name: name,
                price: price,
                priceInteger: Math.floor(price),
                discountPriceInteger: Math.floor(price * 0.01),
                discountRemainder: +((price * 0.01) % 1).toFixed(2)
            });
            $scope.prices.push(price);

            if ($scope.indexMaxPrice >= 0) {
                $scope.baskets[$scope.indexMaxPrice].discountPriceInteger -= Math.floor($scope.discountRemainderAll);
            }

            $scope.discountIntegerAll = 0;
            $scope.discountRemainderAll = 0;
            angular.forEach($scope.baskets, function (value, index) {
                $scope.discountIntegerAll += (value.price - (value.price - value.discountPriceInteger));
                $scope.discountRemainderAll += value.discountRemainder;
                if (value.price == Math.max.apply(null, $scope.prices)) {
                    $scope.indexMaxPrice = index;
                }
            });

            var currentDiscountMaxPrice = $scope.baskets[$scope.indexMaxPrice].discountPriceInteger;
            $scope.baskets[$scope.indexMaxPrice].discountPriceInteger += Math.floor($scope.discountRemainderAll);

            if (currentDiscountMaxPrice != $scope.baskets[$scope.indexMaxPrice].discountPriceInteger) {
                $scope.discountIntegerAll += Math.floor($scope.discountRemainderAll);
            }

            $scope.name = null;
            $scope.price = null;

        } else {
            $scope.price = null;
        }
    };

    /**
     * Проверка для поля "Цена"
     * @param val
     * @param arr
     * @returns {boolean}
     */
    $scope.check = function (val, arr) {
        if (isNaN(val)) {
            alert('Цена должна быть числом');
            return false;
        } else {
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].price == val) {
                        alert('Цена не должна повторяться!');
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }

        }
    };

    /**
     * Применить и очистить
     */
    $scope.apply = function () {
        $scope.baskets = [];
        $scope.name = null;
        $scope.price = null;
        $scope.discountIntegerAll = 0;
        alert("Скидка применилась!");
    };

});
