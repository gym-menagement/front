// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'helth_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HelthModel _$HelthModelFromJson(Map<String, dynamic> json) => HelthModel(
      id: json['id'] as int,
      category: json['category'] as int,
      term: json['term'] as int,
      name: json['name'] as String,
      count: json['count'] as int,
      cost: json['cost'] as int,
      discount: json['discount'] as int,
      costdiscount: json['costdiscount'] as int,
      content: json['content'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$HelthModelToJson(HelthModel instance) =>
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
