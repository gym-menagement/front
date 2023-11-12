// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

OrderParams _$OrderParamsFromJson(Map<String, dynamic> json) => OrderParams(
      id: json['id'] as int?,
      membership: json['membership'] as int?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$OrderParamsToJson(OrderParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'membership': instance.membership,
      'date': instance.date,
    };
