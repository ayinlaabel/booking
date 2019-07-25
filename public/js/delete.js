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
                window.location.href = '/admin/add_doctors'
            },
            error: function(err){
                console.log(err)
            }
        });
    });
});