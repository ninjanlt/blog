/**
 * 函数式编程 - 闭包
 * 
 */

function makeAdjectifier(adjective){
    return function(noun){
        return adjective + '' + noun;
    }
}

const coolify = makeAdjectifier('cool');
coolify('workshop'); // cool workshop
coolify('drink'); // cool drink
