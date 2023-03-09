class StoreElementCRM {
    constructor (productName = "", porductPrice = 0, productImage = "/img/error.png", productDescription = "", productQuantity = 0, keywords = [], dateNow = () => {}, id = () => {}) {
        this.id = id()
        this.date = dateNow()
        this.productName = productName;
        this.porductPrice = porductPrice;
        this.productImage = productImage;
        this.productDescription = productDescription;
        this.productQuantity = productQuantity;
        this.keywords = keywords.split(",");
        this.status = false
    }
}

export {StoreElementCRM}