// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'discount_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DiscountModel _$DiscountModelFromJson(Map<String, dynamic> json) =>
    DiscountModel(
      id: json['id'] as int,
      name: json['name'] as String,
      discount: json['discount'] as int,
      date: json['date'] as String,
    );

Map<String, dynamic> _$DiscountModelToJson(DiscountModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'discount': instance.discount,
      'date': instance.date,
    };
