$(document).ready(() =>{
    $('.accept_doc').on('click', (e) =>{
        $target = $(e.target);
        // console.log( $target.attr('data-id'))
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/admin/doctor/'+id,
            success: function(response){
                alert('Acceptation letter sent');
                window.location.href = '/admin/add_doctor'
            },
            error: function(err){
                console.log(err)
            }
        });
    });
});



$(document).ready(() =>{
    $('.delete').on('click', (e) =>{
        $target = $(e.target);
        // console.log( $target.attr('data-id'))
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/admin/doctor/'+id,
            success: function(response){
                alert('User you are Removing was not short Listed');
                window.location.href = '/admin/add_doctor'
            },
            error: function(err){
                console.log(err)
            }
        });
    });
});