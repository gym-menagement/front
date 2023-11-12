// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'discount_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DiscountParams _$DiscountParamsFromJson(Map<String, dynamic> json) =>
    DiscountParams(
      id: json['id'] as int?,
      name: json['name'] as String?,
      discount: json['discount'] as int?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$DiscountParamsToJson(DiscountParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'discount': instance.discount,
      'date': instance.date,
    };
