@php
    $headers = collect($columns)->map(function($column) {
        return $column['label'];
    });
@endphp
<table>
    <thead>
    <tr>
        @foreach($headers as $header)
            <th>{{$header}}</th>
        @endforeach
    </tr>
    </thead>
    <tbody>
    @foreach($datas as $data)
        @php
            $row = collect($columns)->map(function($column) use ($data) {
                return $data[$column['name']]??'';
            });
        @endphp
        <tr>
            @foreach($row as $item)
                <td>{{$item}}</td>
            @endforeach
    @endforeach
    </tbody>
</table>