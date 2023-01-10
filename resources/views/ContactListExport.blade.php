@php
    $headers = ['Name', 'Phone', 'Created At'];
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
            $row = collect($data)->only(['name', 'phone', 'created_at']);
        @endphp
        <tr>
            @foreach($row as $item)
                <td>{{$item}}</td>
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>