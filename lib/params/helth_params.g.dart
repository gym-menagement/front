// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'helth_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HelthParams _$HelthParamsFromJson(Map<String, dynamic> json) => HelthParams(
      id: json['id'] as int?,
      category: json['category'] as int?,
      term: json['term'] as int?,
      name: json['name'] as String?,
      count: json['count'] as int?,
      cost: json['cost'] as int?,
      discount: json['discount'] as int?,
      costdiscount: json['costdiscount'] as int?,
      content: json['content'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$HelthParamsToJson(HelthParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'category': instance.category,
      'term': instance.term,
      'name': instance.name,
      'count': instance.count,
      'cost': instance.cost,
      'discount': instance.discount,
      'costdiscount': instance.costdiscount,
      'content': instance.content,
      'date': instance.date,
    };
