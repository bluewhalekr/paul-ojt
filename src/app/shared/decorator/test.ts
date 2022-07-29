export function test(target: any) {

  console.log('tttttt',target.prototype)


  target.prototype.ngOnInit = function() {
    console.log('ttsteestset', this)


  }
}
